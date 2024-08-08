import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import TagList from '../components/taglist'
import Filter from '../components/filter'

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const tags = () => {
    let [tags, setTags] = useState([])

    useEffect(() => {
        getTags()
    }, [])

    let getTags = async () => {
        await fetch('/api/tag')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTags(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container fluid style={{ 'overflow': 'hidden' }}>
            <Filter />
            <Row xs={2} md={5}>
                {tags.map((tag, index) => {
                    return (<Col className='mt-10'><TagList tag={tag} key={index} /></Col>)
                })}
            </Row>
            <Pagination style={{'display':'flex','justifyContent':'center','marginTop':'15px'}}>{items}</Pagination>
        </Container>
    )
}

export default tags