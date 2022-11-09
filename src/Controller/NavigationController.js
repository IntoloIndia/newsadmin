

const navigationGetcategory = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}navigation`, {
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

const createnavigationCategorypost = async (navidata)=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}navigation`, {
          method: 'post',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(navidata),
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
};

const navigationCategoryDelete = async navigation_id => {
    // console.log('object', navigation_id);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}navigation/`+ navigation_id, {
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

  const navigationupdateCategory = async (navigation_id,naviupdatedata) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}navigation/`+ navigation_id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(naviupdatedata),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export {
    navigationGetcategory,createnavigationCategorypost,navigationCategoryDelete, navigationupdateCategory
}

