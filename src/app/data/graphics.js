const importAll = r => r.keys().map(r);

const images = importAll(require.context('../../assets/images/graphics', false, /\.(png|jpe?g|svg)$/));


export default images
  .map((imageUrl, i) => ({
    id: i,
    imageUrl,
  }));
