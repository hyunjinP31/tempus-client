import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectKeyData, viewRaise } from '../module/project';
import { useParams } from 'react-router-dom';
import ProjectList from '../detail/ProjectList';
import { headerMenuChange, headerMenuDefault } from '../module/utility';

const ProjectListContainer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const projectListData = useSelector(state=>state.project.projectListData);
    useEffect(()=>{
        dispatch(getProjectKeyData(params.name));
    },[params]);
    useEffect(()=>{
        if(params.name === '인기') dispatch(headerMenuChange("1"));
        if(params.name === '신규') dispatch(headerMenuChange("2")); 
        if(params.name === '마감임박') dispatch(headerMenuChange("3")); 
        if(params.name === '공개예정') dispatch(headerMenuChange("4"));
        return () => {
            dispatch(headerMenuDefault());
        }
    },[])
    const { loading, data, error } = projectListData;
    
    if(loading) return <div>loading</div>;
    if(error) return <div>error</div>;
    if(!data) return null;

    const onClick = (id) => {
        dispatch(viewRaise(id));
     }
    return (
        <>
            <ProjectList onClick={onClick} projects={data} />
        </>
    );
};

export default ProjectListContainer;