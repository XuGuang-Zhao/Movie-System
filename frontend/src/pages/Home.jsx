import React, { useCallback } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { SearchOutlined as SearchIcon } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import qs from 'query-string';
import { Request } from "../api/request";

const Home = () => {
    const { Content } = Layout;
    const history = useHistory();
    const onFinish = useCallback((values) => {
        const { name, genre, actor, description, director } = values;
        const queryStr = qs.stringify(values);
        const url = `/search/?${queryStr}`;
        const ContentData = {
            name: name || '',
            genre: genre || '',
            actor: actor || '',
            director: director || '',
            description: description || '',
        }
        Request('POST', ContentData, '/search/search').then(data => {
            if (data) {
                history.push(url);
                localStorage.setItem('movie_list', JSON.stringify(data.movie_list));
                localStorage.setItem('filter_list', JSON.stringify(data.filter_list));
            }
        })
    }, [history])
     
    return (
        <Layout>
            <div className='backgroundImg'>
                <Content>
                    <SearchContainer>
                        <SearchForm labelCol={{ span: 12 }} onFinish={onFinish}>
                            <SearchFormItem name="name" label='Movie Name: '><SearchInputBox placeholder="Movie Name" /></SearchFormItem>
                            <SearchFormItem name="genre" label='Genre: '><SearchInputBox
                                placeholder="Genre" /></SearchFormItem>
                            <SearchFormItem name="actor" label='Actor: '><SearchInputBox
                                placeholder="Actor" /></SearchFormItem>
                            <SearchFormItem name="description" label='Description: '><SearchInputBox
                                placeholder="Description" /></SearchFormItem>
                            <SearchFormItem name="director" label='Director: '><SearchInputBox placeholder="Director" /></SearchFormItem>
                            <SearchButton type="primary" htmlType="submit">
                                <SearchIcon />
                            </SearchButton>
                        </SearchForm>
                    </SearchContainer>
                </Content>
            </div>
        </Layout>
    )
}

export default Home;

const SearchContainer = styled.div`
  width: 80%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 55px;
  padding: 15px 0 0 75px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: 100px auto 0;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.5);
`

const SearchForm = styled(Form)`
  flex-direction: column;
`
const SearchFormItem = styled(Form.Item)`
  display: table;
  margin: 0 auto;
`

const SearchInputBox = styled(Input)`
  width: 200px;
`
const SearchButton = styled(Button)`
  display: table;
  width: 140px;
  margin: 10px auto;
`
