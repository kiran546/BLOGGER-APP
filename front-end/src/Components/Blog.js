import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux';
import axios from 'axios';





function Blog(props) {

   
    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(0)
    const [body, setBody] = useState('')
    const [picture, setPicture] = useState('')
    const [k, setK] = useState(null)

    const [token_id, setTokenId] = useState(0)
    const [edit, setEdit] = useState(-1)
    const [blogdata, setBlogData] = useState([])

    // for modals 


    useEffect(() => {
        if (!props.bearer_token) {
            props.history.push('/')
        }

    }, [])

    // for editing blog with specific id 

    // Get method to get blogs
    const getBlogs = () => {
        axios.get('http://127.0.0.1:8000/blogs/')
            .then(response => {
                setBlogData(response.data)
                console.log(response.data, "blog data")
                props.bloggers_data(response.data)
            })
    }

    console.log("bloggerdata", blogdata)

    useEffect(() => {
        setTokenId(props.token_with_id)
        getBlogs()
    }, [])





    const edit_Blog = (d,tit,dat,bod,pic) => {

            setId(d)
            setEdit(d)
            setTitle(tit)
            setDate(dat)
            setBody(bod)
            setPicture(pic)

    }

    // setting up modals for opening and closing

    const modalOpen = (key_id,tit,dat,bod,pic) => {
      
        setTitle(tit)
        setDate(dat)
        setBody(bod)
        setPicture(pic)

        console.log("keys", key_id)


    }

    // closing modal 

    const closeModal = () => {

       
        setTitle('')
        setDate(0)
        setBody('')
        setPicture('')
        getBlogs()
        setK(null)



    }

    // postmethod to send data to db 

    const post_Data = (e) => {
        e.preventDefault()
        setEdit(-1)

        let our_Data = new FormData();
        our_Data.append('author', `http://127.0.0.1:8000/users/${token_id}/`)
        our_Data.append('title', e.currentTarget['title'].value)
        our_Data.append('body', e.currentTarget['body'].value)
        our_Data.append('date', e.currentTarget['date'].value)
        our_Data.append('picture', picture)


        axios.post('http://127.0.0.1:8000/blogs/', our_Data)
            .then(response => {
                console.log(response.data, "postdata")
                getBlogs()
                setTitle('')
                setDate(0)
                setBody('')
                getBlogs()




            }).catch(err=>{
                console.log(err,"not posted")
            })

    }



    // put method for updating blogs , setting setedit to-1 for editing it
    const update_Blog = (e,id) => {
        e.preventDefault()
        setEdit(-1)


        let our_Data = new FormData();
        our_Data.append('author', `http://127.0.0.1:8000/users/${token_id}/`)
        our_Data.append('title', e.currentTarget['title'].value)
        our_Data.append('body', e.currentTarget['body'].value)
        our_Data.append('date', e.currentTarget['date'].value)
        k != null && our_Data.append('picture', picture)


        axios.put(`http://127.0.0.1:8000/blogs/${id}/`,our_Data)
            .then(res => {
                console.log(res.data, 'Updated data');
                setTitle('')
                setBody('')
                setDate(0)
                getBlogs()
                setPicture('')

            }).catch(err=>{
                console.log(err,"not posted")
            })


    }

    
    // delete method to delete blogs which we have created and get from db
    const deleteBlog = (id) => {
        axios.delete(`http://127.0.0.1:8000/blogs/${id}/`)
            .then(response => {
                getBlogs()
                console.log(response.data, "delete")
            })
    }

    // uploading a picture

    const upload_Pic = event => {
        event.preventDefault();
        console.log("hello", event.target.files[0].name)
        setK(-1)
        setPicture(event.target.files[0])
    }



    return (

        <>
            <div className="container mt-4">
                <div className="row ">
                    {blogdata.map(item =>
                        <div className=" col-12 col-sm-8 col-md-6 col-lg-4" key={item.id} >
                            <div className="card mb-3">
                                <img className="card-img" height={210} width={50} src={item.picture} alt="hi" />
                                <div className="card-body">
                                    <h4 className="card-title">{item.title}</h4>
                                    <small className="text-muted cat">

                                    </small>
                                    <p className="card-text"><small key={item.id} className="text-muted"></small></p>
                                    <p className="card-text">{`${item.body.slice(0,15)}.....`}</p>
                                    {`http://127.0.0.1:8000/users/${props.token_with_id}/` === item.author && <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteBlog(item.id) }} >Delete</button>}
                                    {`http://127.0.0.1:8000/users/${props.token_with_id}/` === item.author && <button className="btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBlog" onClick={() => { edit_Blog(item.id,item.title,item.date,item.body,item.picture) }}>Edit Blog</button>}
                                    <button type="button" onClick={() => { modalOpen(item.id, item.title, item.body, item.date, item.picture) }} className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                        Read
                                    </button>
                                </div>
                                <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                                    <div className="views">{item.date}
                                    </div>


                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">BLOGS </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-12">
                                <div className="card ">
                                    <img className="card-img" src={picture} alt="i" />
                                    <div className="card-body">
                                        <h4 className="card-title">{title}</h4>
                                        <p className="card-text"><small className="text-muted"></small></p>
                                        <p className="card-text">{body}</p>
                                    </div>
                                    <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                                        <div className="views">{date}
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={closeModal} className="btn btn-success" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adding blog */}
            <div className="modal fade" id="staticBlog" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel"> Add Blog</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="col-12">
                    <h1>Blog</h1><br />
                    <form className="row g-6" onSubmit={edit === -1 ? post_Data:(e)=>{update_Blog(e,id)}}>
                        <div className="col-md-4">
                            <label for="validationDefault01" className="form-label"> Title</label>
                            <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="Type Your Username" className="form-control" id="validationDefault01" required />
                        </div>
                      
                        <div className="col-md-4">
                            <label for="validationDefault01" className="form-label">date</label>
                            <input type="date" name="date"  onChange={(e)=>{setDate(e.target.value)}} value={date} placeholder="Type Your Username" className="form-control" id="validationDefault01" required />
                        </div>
                        <div className="col-md-12">
                            <label for="validationDefault02" className="form-label">Body</label>
                            <textarea type="text" name="body" onChange={(e)=>{setBody(e.target.value)}} value={body} placeholder="Type Your Blog" className="form-control" id="validationDefault02" required />
                        </div><br/>
                        <div className="col-md-6">
                                <label for="validationDefault02" className="form-label">image</label>
                                <input type="file" onChange={upload_Pic} accept="picture/png,picture/jpg,picture/jpeg " className="form-control" id="validationDefault02" />
                            </div>
                        <div className="col-12 mt-4 " >
                            {edit === -1 ? <button className="btn btn-dark mt-3" type="submit">Add Blog</button>:
                            <button className="btn btn-success mt-3" type="submit">Update Blog</button>}
                        </div>
                    </form>
                    </div>
                </div>
                <div className="modal-footer">
                   
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div> 
        </>
    )

}

const mapStateToProps = (state, props) => {
    return {
        state,
        token_with_id: state.user_id,
        bearer_token: state.blogger_token != null ? true : false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bloggers_data: (val) => dispatch({ type: 'BLOGGERS_DATA', payload: val })

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)














