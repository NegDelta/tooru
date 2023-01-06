## Pages

The building block of a tooru stash is a _page_, with defined name, lead, and body.

The page's id is deterministic wrt time of creation and number of id's created in the same millisecond (sic - better safe yadda yadda) and totals 17 digits, separated
into 4 threes and the rest, i.e. 5 digits. Least significant digit in the section goes to the right, least significant section goes to the left, like this: `lmn-ijk-fgh-abcde`
It doesn't get another digit until the 24th century or so, chill.
`id`eally, the id should be exposed by frontend only to the necessary extent and hidden until there's a collision to resolve between single- (or any less than whole) -section portions of the id.

The generated id has 3 forms:

- int, e.g. `16358803320355` - filename for blobs, sortable
- string, e.g. `355-320-803-16358` - db pk
- list, e.g. `[355, 320, 803, 16358]` - for frontend

### Page validation

Mininum viable schema is:

- any of `id`, `time`, `edit_time`
- any of `title`, `lead`, `body`

Validation rules:

> - _confirm_ -- condition for prompting, no wrangling, user can confirm or reject field
> - _invalid_ -- wrangling action that will be prompted, user can confirm or reject field

- valid `id` is
  - of any id format
    - confirm never
    - invalid replace with generated from `time` if applicable or from now
  - not clashing with existing id
    - confirm never
    - invalid replace with generated from `time` if applicable or from now
- valid `time` is
  - unix stamp, earlier than (now + 36 h)
    - confirm if any later than now
    - invalid replace with generated from `id` if applicable or with now
- valid `edit_time` is
  - unix stamp, later than (`time` - 36 h)
    - confirm if any earlier than `time`
    - invalid replace with `time`
- valid `title` is
  - of length <=80
    - confirm never
    - invalid trim to 80
- valid `lead` is
  - of length <=280
    - confirm never
    - invalid trim to 280
- valid `body` is
  - any
    - confirm never
    - invalid never
