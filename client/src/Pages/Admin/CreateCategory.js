import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Layouts/Layout';
import AdminMenu from '../../Components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../Components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState ([]);
  const [name, setName] = useState ();
  const [visible, setVisible] = useState (false);
  const [selected, setSelected] = useState (null);
  const [upadtedName, setUpdatedName] = useState (false);

  

  //hanleForm
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const{data}=await axios.post('/api/v1/category/create-category',{name,})
      if (data?.success) {
        toast.success(`${name} is Created`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthin went wrong in input form")
    }
  }

  const getAllCategory = async () => {
    try {
      const {data} = await axios.get (
        '/api/v1/category/get-category'
      );
      if (data.success) {
        setCategories (data.category);
      }
      console.log (categories);
    } catch (error) {
      console.log (error);
      toast.error ('Somthin went wrong in getting category');
    }
  };
  useEffect (() => {
    getAllCategory ();
    //eslint-disable-next-line
  }, []);

  //update category
  const handleUpdate =async(e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,{name:upadtedName}
      );
      if (data.success) {
        toast.success(`${upadtedName} is updates`)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('somthing went wrong')
    }
  }
  //delete category
  const handleDelete =async(Pid)=>{
    try {
      const {data} = await axios.delete(
        `/api/v1/category/delete-category/${Pid}`
      );
      if (data.success) {
        toast.success(`Category is deleted`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('somthing went wrong')
    }
  }
  return (
    <Layout title={'Dashboard - Create Category'}>
      <div className="container-fluid  p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage category</h1>
            <div className='p-3'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {categories?.map (c => (
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true);setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                        <button className="btn btn-danger ms-2"onClick={()=>{handleDelete(c._id)}}>Delete</button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible} ><CategoryForm value={upadtedName} handleSubmit={handleUpdate} setValue={setUpdatedName}/></Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
