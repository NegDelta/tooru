# tooru

A booru, except for text. In fact, this is another run-of-the-mill study-CRUD-wiki app, the most fitting of the three being the study part, in that the two primary reasons for developing the app are to provide a useful tool and to provide experience with the tools used, including MariaDB for the database part, as well as the design process for a piece of software. As this is more of a personal tool, the whole multi-user part with accounts and so on is not on the todo list.

This repository contains: `tooru-rest`, the app being exposed as a REST API, and `tooru-web`, a frontend implementation. Common, interfacing types live in `tooru-common`

## Setup

- REST:
  - Install MariaDB 10.5.
  - Run `setup.sql`.
  - Copy `/config.json` from `config.default.json`.
- Web:
  - Copy `/.env` from `default.env`.

## More

- Design details: [design.md](docs/design.md)
- To-dos: [TODO.md](docs/TODO.md)
