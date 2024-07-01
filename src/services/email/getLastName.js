export default function getLastName(name) {
  const parts = name.trim().split(" ");
  console.log(parts)
  console.log(parts[parts.length - 1])
  return parts[parts.length - 1];
}
