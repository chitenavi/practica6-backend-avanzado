const filterForm = document.querySelector('.filter');

filterForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formData = new FormData(filterForm);
  if (formData.get('tag') === 'all') {
    formData.delete('tag');
  }
  if (!formData.get('start')) {
    formData.delete('start');
  }
  if (!formData.get('limit')) {
    formData.delete('limit');
  }
  if (formData.get('minPrice') || formData.get('maxPrice')) {
    const price = `${formData.get('minPrice')}-${formData.get('maxPrice')}`;
    formData.append('price', price);
  }
  formData.delete('minPrice');
  formData.delete('maxPrice');
  if (formData.get('sale') === 'both') {
    formData.delete('sale');
  }
  if (formData.get('sort') === 'normal') {
    formData.delete('sort');
  }

  //const queryString = new URLSearchParams(formData).toString();

  /* GET adverts from API usin fetch */
  /*
  const response = await fetch(
    `http://localhost:3000/api/v1/adverts?${queryString}`
  );
  const dataRes = await response.json();
  console.log(dataRes.data.adverts);
  */

  /* Redirect with filter query string */
  document.location = `${document.location.origin}?${new URLSearchParams(
    formData
  ).toString()}`;
});
