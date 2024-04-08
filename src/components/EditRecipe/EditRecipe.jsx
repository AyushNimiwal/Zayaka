import React, { useEffect } from 'react'
import Dropzone from '../AddRecipe/Dropzone'
import { useState } from 'react'
import service from '../appwrite/conf'
import { useNavigate,useParams } from 'react-router-dom'
function EditRecipe() {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState({});
    const [recipename, setRecipename] = useState('');
    const [time, setTime] = useState(0);
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions]= useState([]);
    const [category, setCategory]= useState([]);
    const [images, setImages]= useState([]);
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        service.getPost(id).then((res)=>{
            setRecipename(res.recipename);
            setTime(res.time);
            setDescription(res.description);
            setIngredients(res.ingredients);
            setInstructions(res.instructions);
            setCategory(res.category);
            setImages([res.featuredImages]);
            service.getImage(res.featuredImages[0]).then((img)=>{
                setPreview(img);
            })
            console.log(res);
        })
    }, [id])
    const removeIngredients = indexToRemove => {
        setIngredients([...ingredients.filter((_, index) => index !== indexToRemove)]);
    }
    const addIngredients = event => {
        if(event.key==='Enter' && event.target.value!==''){
            setIngredients([...ingredients, event.target.value])
            event.target.value = ''
        }
    }
    const removeCategory = indexToRemove => {
        setCategory([...category.filter((_, index) => index !== indexToRemove)]);
    }
    const addCategory = event => {
        if(event.key==='Enter' && event.target.value!==''){
            const value = event.target.value.toLowerCase();
            setCategory([...category, value])
            event.target.value = ''
        }
    }
    const removeInstructions = indexToRemove => {
        setInstructions([...instructions.filter((_, index) => index !== indexToRemove)]);
    }
    const addInstructions = event => {
        if(event.key==='Enter' && event.target.value!==''){
            setInstructions([...instructions, event.target.value])
            event.target.value = ''
        }
    }
    const updateRecipe=()=>{
        if(recipename==='' || time===0 || description==='' || ingredients.length===0 || instructions.length===0 || category.length===0){
            alert('Please fill all the fields');
            return;
        }
        setUploading(true);
        if(file!==null){
            const imgid=images[0];
            service.uploadImage(file).then(response=>{
                setImages([response.$id]);
                console.log(recipename,time,description,ingredients,instructions,category,response.$id);
                service.updatePost(id,{recipename,time,description,ingredients,instructions,category,featuredImages:[response.$id]}).then((res)=>{
                    setCategory([]);
                    setDescription('');
                    setIngredients([]);
                    setInstructions([]);
                    setRecipename('');
                    setTime(0);
                    setImages([]);
                    navigate('/', { replace: true });
                })
            });
            service.deleteImage(imgid).then((res)=>(console.log()));
            
        }else{
            console.log(recipename,time,description,ingredients,instructions,category,response.$id);
            service.updatePost(id,{recipename,time,description,ingredients,instructions,category,featuredImages:images}).then((res)=>{
                setCategory([]);
                setDescription('');
                setIngredients([]);
                setInstructions([]);
                setRecipename('');
                setTime(0);
                setImages([]);
                navigate('/', { replace: true });
            })
        }
    }
    const removeFile=()=>{
            setFile(null);
            setPreview(null);
    }

  return (
    <div  className='w-screen h-full'>
        <h1 className='h-text px-8 mt-10 text-[2rem]'>Edit Recipe</h1>
        <div className='w-full h-fit flex flex-col justify-center items-center'>
        <div className='w-full h-fit flex justify-around'>
            <Dropzone setPreview={setPreview} setFile={setFile} className=' w-full sm:w-5/12 rounded-xl h-56 flex justify-center items-center bg-slate-50 border-2 border-dashed mb-4' />
            <div className=" w-full sm:w-1/2 mr-10 bg-slate-50 rounded-xl h-[50vh] flex flex-wrap justify-center py-4 upload-c">
            {preview===null?<div className=' w-full h-full rounded-xl  flex justify-center items-center text-gray-300'>No Images Selected</div>:
                <div className='w-64 h-56 m-2 rounded-xl relative upload-card overflow-hidden'>
                <div className="w-64 h-56 rounded-xl object-cover absolute overflow-hidden">
                    <img
                    src={preview.href}
                    alt="preview"
                    className="w-64 h-56 rounded-xl object-cover upload-c-img transition-transform"
                    />
                </div>
                <div className='w-full h-full absolute bg-gradient-to-t from-orange-200/40 transition-transform to-transparent translate-y-full flex justify-center items-center upload-card-b'>
                    <div onClick={removeFile} className='w-fit h-fit bg-red-500 text-white p-2 rounded-full shadow-xl cursor-pointer'>Remove</div>
                </div>
                </div>}
            </div>
        </div>
        <div className='w-full sm:px-10 flex sm:flex-row flex-col'>
            <div className='w-full sm:w-1/2 h-fit sm:px-10 py-12 flex justify-center items-center relative'>
                <div className='w-4/5 h-3/4 px-4 -rotate-12 rounded-lg bg-orange-400 shadow-lg absolute'>
                </div>
                <div className=' h-text absolute top-0 left-0 text-4xl p-2 bg-transparent'>Recipe Details</div>
                <div className=' w-full h-fit sm:mx-8 mx-5 px-4 flex flex-col z-10 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white'>
                    <label className='text-xl mt-4 mx-4'>Recipe Name</label>
                    <input className='sm:w-11/12 mx-4 h-10 border-2 border-orange-400 rounded-md resize-none px-2' value={recipename} onChange={(e)=>setRecipename(e.target.value)} type='text' placeholder='Enter Recipe Name'/>

                    <label className='text-xl mt-4 mx-4'>Time to Cook</label>
                    <input className='sm:w-11/12 mx-4 h-10 border-2 border-orange-400 rounded-md resize-none px-2' type='number' value={time} onChange={(e)=>setTime(e.target.value)} placeholder='In minutes' />

                    <label className='text-xl mt-4 mx-4'>Recipe Description</label>
                    <textarea className='sm:w-11/12 mx-4 h-20 border-2 border-orange-400 rounded-md resize-none px-2' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} maxLength={150} placeholder='Enter Recipe Description'/>

                    <label className='text-xl mt-4 mx-4'>Recipe Ingredients</label>
                    <input className='sm:w-11/12 mx-4 h-10 border-2 border-orange-400 rounded-md resize-none px-2' type='text'  placeholder='Enter Recipe Ingredients' onKeyUp={addIngredients}/>

                    <label className='text-xl mt-4 mx-4'>Recipe Instructions:</label>
                    <input className='sm:w-11/12 mx-4 h-10 border-2 border-orange-400 rounded-md resize-none px-2' type='text' placeholder='Enter Recipe Instructions' onKeyUp={addInstructions}/>

                    <label className='text-xl mt-4 mx-4'>Recipe Category:</label>
                    <input className='sm:w-11/12 mx-4 h-10 border-2 border-orange-400 rounded-md resize-none px-2' type='text' placeholder='Enter Recipe Category' onKeyUp={addCategory}/>
                    {
                        uploading ?<div className='sm:w-11/12 h-10 my-3 mx-4 bg-green-400 text-white rounded-md flex items-center justify-center'>Uploading Recipe...</div>
                        :<button onClick={updateRecipe} className='sm:w-11/12 h-10 my-3 bg-orange-400 text-white rounded-md mx-4'>Update Recipe</button>
                    }
                </div>
            </div> 
            <div className='w-full sm:w-1/2 h-fit flex gap-4 flex-col justify-center items-center'>
                <div className='w-full h-fit bg-slate-50 rounded-xl p-4'>
                    <h1 className=' text-2xl h-text my-2'>Ingredients</h1>
                    {ingredients.length===0 && <div className='w-full h-fit rounded-xl  flex justify-center items-center text-gray-300'>No Ingredients Added</div>}
                    <ul>
                        {ingredients.map((tag, index) => (
                            <li key={index} className=' w-fit inline-block bg-orange-400 text-white px-2 py-1 rounded-md m-1'>
                                <span>{tag}</span>
                                <button className='ml-2 text-red-500 w-fit h-fit px-2 rounded-md bg-white' type='button' onClick={() => removeIngredients(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='w-full h-fit bg-slate-50 rounded-xl p-4'>
                    <h1 className=' text-2xl h-text my-2'>Instructions</h1>
                    {instructions.length===0 && <div className='w-full h-fit rounded-xl  flex justify-center items-center text-gray-300'>No Instructions Added</div>}
                    <ul>
                        {instructions.map((tag, index) => (
                            <li key={index} className=' w-fit bg-orange-400 text-white px-2 py-1 rounded-md m-1'>
                                <span>{tag}</span>
                                <button className='ml-2 text-red-500 w-fit h-fit px-2 rounded-full bg-white' type='button' onClick={() => removeInstructions(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='w-full h-fit bg-slate-50 rounded-xl p-4'>
                    <h1 className=' text-2xl h-text my-2'>Categories:</h1>
                    {category.length===0 && <div className='w-full h-fit rounded-xl  flex justify-center items-center text-gray-300'>No Category Added</div>}
                    <ul>
                        {category.map((tag, index) => (
                            <li key={index} className=' w-fit bg-orange-400 text-white px-2 py-1 rounded-md m-1'>
                                <span>{tag}</span>
                                <button className='ml-2 text-red-500 w-fit h-fit px-2 rounded-full bg-white' type='button' onClick={() => removeCategory(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditRecipe