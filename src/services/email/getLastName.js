export default function getLastName(name) {
  const parts = name.trim().split(" ");
  return parts[parts.length - 1];
}
