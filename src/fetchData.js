export default async function fetchData() {
  const DUPLICATES_INDEX = [25, 26, 31, 32, 34, 38, 39, 40, 42, 44];
  const response = await fetch(
    `${
      import.meta.env.VITE_URL
    }?method=artist.gettopalbums&artist=King+Gizzard+And+The+Lizard+Wizard&api_key=${
      import.meta.env.VITE_KEY
    }&format=json`,
  );
  const result = await response.json();
  return result.topalbums.album.filter(
    (_, index) => !DUPLICATES_INDEX.includes(index),
  );
}
