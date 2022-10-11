import { useState } from "react"
import ColorPick from "./ColorPick"
import { fetchPatch, fetchDelete } from "../util/api"

const DeleteCategory = ({lists, setIsClick, setIsClickDlt, editId, setColor, color}) => {
    //listData
    const listData = lists.filter(list => {
        return Number(editId) === list.id;
    })

    //backButton
    const clickBack = () => {
        setIsClickDlt(false);
        setIsClick(true);
    }

    //input
    const [listCategory, setListCategory] = useState(listData[0].category)
    const editInput = (e) => {
        setListCategory(e.target.value);
    }

    //editWrite
    const handleWrite = (e) => {
        if(listData[0].color && listCategory){
            e.preventDefault();
            let editColor = color ? color : listData[0].color;
            const data = {category:listCategory, color:editColor};
            fetchPatch("http://localhost:3001/lists/", listData[0].id, data);
            clickBack();
        }
    }

    //delete
    const handleDelete = () => {
        let result = window.confirm('정말 삭제하시겠습니까?');
        if(result === true){
            fetchDelete("http://localhost:3001/lists/", listData[0].id);
        }else{
            return false;
        }
    }

    return (
        <div className="deleteCategory">
            <button className='backBtn' onClick={clickBack}>back</button>
            <h2>카테고리 편집</h2>
            <input type='text' onChange={editInput} value={listCategory}></input>
            <h3>색상</h3>
            <ColorPick setColor={setColor}/>
            <button className="delete" onClick={handleDelete}>삭제</button>
            <button className='editWrite' onClick={handleWrite}>확인</button>
        </div>
    )
}

export default DeleteCategory;