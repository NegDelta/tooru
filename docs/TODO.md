Legend:

- 🏗 — has design
- 🚧 - to be updated
- ✨ — will most likely see work next
- 🌐 — specific to frontend
- 📞 — specific to backend

## Immediate to-dos

### Deserialization

That is, loading backups.

- input processing
  - (🏗) validate json
  - convert data to logic requests

### 🌐 Others

- 🌐 implement react-router behavior in form cancel
- 🌐 show placeholder while loading
- 🌐 dev QoL
  - replace string `+`ing with `` ` ``s
  - CSS preprocessing

## Long-term to-dos

### Tags

A page can have _tags_. All tags are created equal, for now at least. Any relationship between tags (parent-child, restriction from user and to backend, etc.) would be defined in a separate schema.

In terms of danbooru-style tags (features vs IP's vs authors vs charas), this does imply that two tags of same text but different categories cannot exist. When added later, one can do syntax like `:type:body` for backwards compat.

Schema:

```sql
CREATE TABLE taggings (
    tag VARCHAR(80) NOT NULL,
    pageid VARCHAR(17) NOT NULL,
    PRIMARY KEY(tag, pageid),
    FOREIGN KEY (pageid) REFERENCES pages(id)
);
```

### 🚧 Special pages

To ensure backwards compatibility, these are described within the pages body (🚧 or metadata), rather than additional table fields.

#### Use cases

- Tracked pages
  - When editing or deleting a tracked page, its previous version is saved as a snapshot. The snapshot itself is not editable. The relevant details can be made visible in a pagetype-specific metadata section.
- Serials
  - One page can be a precedessor, successor, parent or child of another.
  - Consider the use-case of a CYOA serial. A page can have a precedessor, multiple non-unique successors, with one of them duplicated as the canonical successor, and potentially a parent page, common to all story pages.

### 🚧 Metadata in body

The `body` can contain (preferably begin with) special syntax to extend or substitute for SQL-side metadata.

### Others

- Sort and filter pages
- Actual npm magic around versions and changes
- Rendering options
  - Plain
    - Line-wrapped: translate newlines to spaces, 2+ to newline
    - Non-line-wrapped: translate all newlines literally
    - Collapse newlines, y/n
  - Markdown
  - ? Other rich text approaches
    - BBCode-style markup
  - Preprocessing
    - `--` to em dash, etc.
    - Use as rendering parameters or bake in on save
- 📞 Analytics
- ✨ Replace `lead` field with `metatext`
  - Dates of source creation, last edition, etc.
- Internal json field, e.g. formatting settings
- Page shortcuts
  - Few characters long
  - To go with the quick goto
- Check database for specified tables and columns
  - Admin route to report any problems in-app
- 🌐✨ Validate input to disallow completely empty pages
- 🌐 Use Quill.js for page editor
- 🌐 Keyboard-only navigation with one-key shortcuts
- 🌐 File-like flow of page state
  - Save As
  - Duplicate
- Separate projects
