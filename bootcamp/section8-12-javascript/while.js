var count = -10

while (count < 20) {
  console.log(count)
  count++
}

console.log('---')
count = 10

while (count < 41) {
  if ((count % 2) === 0) {
    console.log(count)
  }
  count++
}

console.log('---')
count = 300

while (count < 334) {
  if ((count % 2) !== 0) {
    console.log(count)
  }
  count++
}

console.log('---')
count = 5

while (count < 51) {
  if (((count % 5) === 0) && ((count % 3) === 0)) {
    console.log(count)
  }
  count++
}
