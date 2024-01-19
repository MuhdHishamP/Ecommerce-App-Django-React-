import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Row, Image, ListGroup, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MoneyFormatter } from "../components/Product";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const [qty, setqty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  };

  return (
    <div>
      <LinkContainer to="/">
        <Button variant="light" className="my-3 border border-secondary">
          Go back
        </Button>
      </LinkContainer>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} xs={12}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} xs={6} className="my-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  Color="#f8e825"
                />
              </ListGroup.Item>
              <ListGroup.Item>
                &#8377;{MoneyFormatter.format(product.price)}
              </ListGroup.Item>
              {/* this is the formatted price */}
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} xs={6} className="my-2">
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col md={4} xs={4}>
                    Price{" "}
                  </Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col className="text-end">
                    &#8377;{MoneyFormatter.format(product.price)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4} xs={4}>
                    Status{" "}
                  </Col>
                  <Col md={1} xs={1}>
                    :
                  </Col>
                  <Col className="text-end">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Select
                        value={qty}
                        onChange={(e) => setqty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  variant="dark"
                  style={{ width: "100%" }}
                  disabled={product.countInStock == 0}
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
