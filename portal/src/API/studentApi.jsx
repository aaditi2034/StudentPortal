export function fetchData() {
  return fetch('http://localhost:3001/studentData')
    .then(response => response.json());
}

export function insertData(props) {
  return fetch('http://localhost:3001/studentData', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      rollno: props.rollno,
      name: props.name,
      subject: props.subject,
      marks: props.marks,
    }),
  });
}
