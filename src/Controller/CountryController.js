// const url = 'http://192.168.0.99:4500/api/country'

const countryGet = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}country`, {
          method: 'get',
          headers: {
            'content-Type': 'application/json',
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
 };

const createcountrypost = async (categorydata)=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}country`, {
          method: 'post',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(categorydata),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
};

const deleteCountrydata = async country_id => {
    console.log('object', country_id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}country/`+ country_id, {
        method: 'delete',
        headers: {
          'content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const CouyntryUpdate = async (country_id,countryupdate) => {
    // console.log("dfgkashdfkjahsdfhkasdfh"+country_id,countryupdate)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}country/`+country_id,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryupdate),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export { createcountrypost,countryGet,deleteCountrydata,CouyntryUpdate}