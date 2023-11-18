export const getNftList = async () => {
  const query = `
        query MyQuery {
            mints(first: 100) {
                carbon
                cerfId
                id
                owner
            }
        }
    `;

  const url = 'https://api.studio.thegraph.com/query/57070/avatar/v3/';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.mints;
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return null;
  }
};

let result = getNftList().then((data) => {
  console.log(data);
});
