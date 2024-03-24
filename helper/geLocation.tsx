export async function geLocation(lat: number, lon: number) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );
  const data = await response.json();
  console.log(data);
  return data;
}