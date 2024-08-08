import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Container, Col, Button } from 'react-bootstrap'
import ProductsList from '../components/productsList'
import ShopsList from '../components/shopsList'
import TagList from '../components/taglist'


const home = () => {
    let [home, setHome] = useState({products:[], shops:[], categories:[], tags:[]})

    useEffect(() => {
        getHome()
    }, [])

    let getHome = async () => {
	    console.log('Coming Home')
        try {
        	let response = await fetch('/api/home')
		    if (!response.ok) {
                if (response.status === 500 ) {
                    alert('Network Error!')
                } else if (response.status === 404) {
                    console.log('404 Error: ', 'Resourse not Found.');
                }
                throw new Error('Response not ok', response);
            }
            let data = await response.json()
            console.log('Home :', data);
            setHome(data)
        } catch (error) {
            console.log('Error: ', error)
        }
	}

    return (
        <Container fluid>
            <div>
                <div style={{ 'display':'grid','gridTemplateColumns':'170px 3fr','gap':'5px'}}>
                    <div style={{'display':'flex','flexDirection':'column','gap':'15px','boxShadow':'rgb(0, 114, 140) 1px 0','padding':'5px'}}>
                        <span style={{'padding':'3px','backgroundColor':'#41436A','margin':'-4px'}}>Categories</span>
                        {home.categories.map((category, index) => {
                            return (<Link to={`api/category/${category.id}`} className='home-categories'>
                                        <span className='px-1 home-category' key={index}>{category.category}</span>
                                    </Link>
                                )
                        })}
                        <Link to='api/categories'>See all</Link>
                    </div>
                    <div style={{ 'marginTop': '15px', 'marginLeft': '5px' }}>
                        <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                            <h3>Deals</h3>
                            <Button variant="primary" href='#/api/tag'>
                                <small className='bold'>See All &raquo;</small>
                            </Button>
                        </div>
                        <Row xs={1} md={3} lg={4}>
                            {home.tags.map((tag, index) => {
                                return (<Col className='px-6 mt-10'><TagList key={index} tag={tag} /></Col>)
                            })}
                        </Row>
                    </div>
                </div>
                <div style={{'marginTop':'15px'}}>
                    <h3>Top Product</h3>
                    <div className='home-product-row'>
                        {home.products.map((product, index) => {
                            return(<ProductsList key={index} product={product} />)
                        })}
                    </div>
                </div>    
                <div style={{'marginTop':'15px'}}>
                    <h3>Hot Merchants</h3>
                    <div className='shopslist'>
                        {home.shops.map((shop, index) => {
                            return(<ShopsList key={index} shop={shop} />)
                            
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default home
