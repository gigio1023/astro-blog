#!/usr/bin/env python3
"""
Blog Post Migration Script
Migrates posts from content/posts to src/content/blog with frontmatter transformation.

Rules:
- title: keep as-is
- date: keep as-is
- description: add "." if missing (placeholder for AI to fill later)
- tags: keep as-is
- categories: REMOVE
- excerpt: REMOVE
- draft: add false as default
"""

import os
import re
import shutil
from pathlib import Path

# Paths
SOURCE_DIR = Path("content/posts")
TARGET_DIR = Path("src/content/blog")

def slugify(title: str) -> str:
    """Convert title to URL-friendly slug."""
    # Remove special characters, replace spaces with hyphens
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug

def extract_frontmatter(content: str) -> tuple[dict, str]:
    """Extract frontmatter and body from markdown content."""
    if not content.startswith('---'):
        return {}, content
    
    # Find the closing ---
    end_idx = content.find('---', 3)
    if end_idx == -1:
        return {}, content
    
    frontmatter_str = content[3:end_idx].strip()
    body = content[end_idx + 3:].strip()
    
    # Parse frontmatter (simple YAML parsing)
    frontmatter = {}
    current_key = None
    current_list = None
    
    for line in frontmatter_str.split('\n'):
        line = line.rstrip()
        
        # Skip empty lines
        if not line.strip():
            continue
            
        # Check for list item
        if line.startswith('  - ') or line.startswith('    - '):
            if current_list is not None:
                value = line.strip().lstrip('- ').strip('"\'')
                current_list.append(value)
            continue
        
        # Check for key: value
        if ':' in line and not line.startswith(' '):
            current_list = None
            key, _, value = line.partition(':')
            key = key.strip()
            value = value.strip()
            
            # Handle inline arrays like ["tag1", "tag2"]
            if value.startswith('[') and value.endswith(']'):
                items = value[1:-1].split(',')
                frontmatter[key] = [item.strip().strip('"\'') for item in items if item.strip()]
            elif value.startswith('"') and value.endswith('"'):
                frontmatter[key] = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                frontmatter[key] = value[1:-1]
            elif value == '':
                # Could be a list following
                frontmatter[key] = []
                current_list = frontmatter[key]
                current_key = key
            else:
                frontmatter[key] = value
    
    return frontmatter, body

def transform_frontmatter(fm: dict) -> dict:
    """Transform old frontmatter to new Astro format."""
    new_fm = {}
    
    # Required: title
    new_fm['title'] = fm.get('title', 'Untitled')
    
    # Required: description (use "." as placeholder)
    new_fm['description'] = '.'
    
    # Required: date
    if 'date' in fm:
        new_fm['date'] = fm['date']
    else:
        new_fm['date'] = '2021-01-01'
    
    # Optional: tags (keep as-is)
    if 'tags' in fm and fm['tags']:
        new_fm['tags'] = fm['tags']
    
    # Optional: draft
    new_fm['draft'] = False
    
    # SKIP: categories, excerpt
    
    return new_fm

def format_frontmatter(fm: dict) -> str:
    """Format frontmatter dict to YAML string."""
    lines = ['---']
    
    for key, value in fm.items():
        if isinstance(value, list):
            if value:
                items = ', '.join(f'"{v}"' for v in value)
                lines.append(f'{key}: [{items}]')
        elif isinstance(value, bool):
            lines.append(f'{key}: {str(value).lower()}')
        elif isinstance(value, str):
            # Quote strings that might have special characters
            if ':' in value or '"' in value or "'" in value or '\n' in value:
                escaped = value.replace('"', '\\"')
                lines.append(f'{key}: "{escaped}"')
            else:
                lines.append(f'{key}: "{value}"')
        else:
            lines.append(f'{key}: {value}')
    
    lines.append('---')
    return '\n'.join(lines)

def get_slug_from_filename(filename: str) -> str:
    """Extract slug from filename like '2021-08-03-Gradient descent-basic.md'."""
    name = filename.rsplit('.', 1)[0]  # Remove extension
    
    # Remove date prefix if present (YYYY-MM-DD-)
    date_pattern = r'^\d{4}-\d{2}-\d{2}-'
    name = re.sub(date_pattern, '', name)
    
    return slugify(name)

def migrate_post(source_path: Path, target_dir: Path) -> bool:
    """Migrate a single post."""
    try:
        content = source_path.read_text(encoding='utf-8')
        fm, body = extract_frontmatter(content)
        
        if not fm:
            print(f"  Warning: No frontmatter found in {source_path}")
            return False
        
        # Transform frontmatter
        new_fm = transform_frontmatter(fm)
        
        # Create slug from filename or title
        slug = get_slug_from_filename(source_path.name)
        if not slug:
            slug = slugify(new_fm['title'])
        
        # Create target directory
        post_dir = target_dir / slug
        post_dir.mkdir(parents=True, exist_ok=True)
        
        # Write new content
        new_content = format_frontmatter(new_fm) + '\n\n' + body
        target_path = post_dir / 'index.md'
        target_path.write_text(new_content, encoding='utf-8')
        
        print(f"  ✓ {source_path.name} -> {slug}/index.md")
        return True
        
    except Exception as e:
        print(f"  ✗ Error migrating {source_path}: {e}")
        return False

def main():
    """Main migration function."""
    print("=" * 60)
    print("Blog Post Migration: content/posts -> src/content/blog")
    print("=" * 60)
    
    if not SOURCE_DIR.exists():
        print(f"Error: Source directory '{SOURCE_DIR}' not found!")
        return
    
    # Ensure target directory exists
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    
    # Find all markdown files
    md_files = list(SOURCE_DIR.rglob('*.md'))
    print(f"\nFound {len(md_files)} markdown files to migrate.\n")
    
    success_count = 0
    fail_count = 0
    
    for md_file in sorted(md_files):
        # Skip non-post files (like README.md)
        if md_file.name.lower() == 'readme.md':
            continue
            
        if migrate_post(md_file, TARGET_DIR):
            success_count += 1
        else:
            fail_count += 1
    
    print("\n" + "=" * 60)
    print(f"Migration complete!")
    print(f"  Success: {success_count}")
    print(f"  Failed:  {fail_count}")
    print("=" * 60)

if __name__ == '__main__':
    main()
