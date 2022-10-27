

const subcategoryGet = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}sub-category`, {
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

const subcreateCategorypost = async (subcategroydata)=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}sub-category`, {
          method: 'post',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(subcategroydata),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
};

const subcategoryDelete = async id => {
    // console.log('object', id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}sub-category/`+ id, {
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

  const subupdateCategory = async (category_id,updaetData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}sub-category/`+ category_id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updaetData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export {
    subcategoryGet,subcreateCategorypost,subcategoryDelete, subupdateCategory
}

//categoryUpdate