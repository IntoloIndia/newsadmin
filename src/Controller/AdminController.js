// const url = 'http://192.168.0.99:4500/api/country'

const getRole = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}role`, {
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
}

const getAdmindata = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}admin`, {
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

const createAdminPost = async (userData)=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}admin`,{
          method: 'post',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
};

const deleteAdmindata = async userid => {
    // console.log('object', country_id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}admin/`+ userid, {
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

  const updateAdmindata = async (userid,updatedata) => {
    // console.log("dfgkashdfkjahsdfhkasdfh"+country_id,countryupdate)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}admin/`+userid,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedata),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

// export { createcountrypost,countryGet,deleteCountrydata,CouyntryUpdate}
export { getRole,createAdminPost,getAdmindata,updateAdmindata,deleteAdmindata}
