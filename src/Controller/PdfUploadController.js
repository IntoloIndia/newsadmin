

const getPdfUpload = async ()=>{
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}upload-pdf`, {
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

// const createBlogPost = async (data)=>{
//     try {
//         const res = await fetch(`${process.env.REACT_APP_API_URL}blogs`, {
//           method: 'post',
//           body:data,
//         //   headers: {
//         //     'content-Type': 'application/json',
            
//         //   },
//           body: JSON.stringify(data),
//          });
//         const data = await res.json();
//         return data;
//       } catch (error) {
//         console.log(error);
//       }
// };

const pdfdataDelete = async id => {
    // alert(id)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}upload-pdf/`+ id, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

//   const blogPostUpdate = async (blogPost_id, data) => {
//     alert(blogPost_id)
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}blogs/`+ blogPost_id, {
//         method: 'put',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: data,
//       });
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

export {getPdfUpload,pdfdataDelete,}

//categoryUpdate