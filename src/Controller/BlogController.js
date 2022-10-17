

const blogGet = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}blogs`, {
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

const createBlogPost = async (data)=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}blogs`, {
          method: 'post',
          body:data,
        //   headers: {
        //     'content-Type': 'application/json',
            
        //   },
          body: JSON.stringify(data),
         });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
};

// const categoryDelete = async id => {
//     // console.log('object', id);
//     try {
//       const res = await fetch("http://localhost:4500/api/category/"+ id, {
//         method: 'delete',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const categoryUpdate = async (category_id, updateunitdata) => {
//     try {
//       const res = await fetch(url + category_id, {
//         method: 'put',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateunitdata),
//       });
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

export {createBlogPost,blogGet}

//categoryUpdate