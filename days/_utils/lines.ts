export function * lines (str: string) {
  let curr = 0
  let eol = -1

  while ((eol = str.indexOf("\n",curr))!== -1) {{
    yield str.slice(curr,eol)
    curr = eol + 1
  }}

  if (curr !== str.length) {
    yield str.slice(curr)
  }
}
