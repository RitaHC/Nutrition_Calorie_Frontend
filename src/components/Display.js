import Carousel from 'react-bootstrap/Carousel';

const Display = (props)  => {
    console.log(" Display Screen")
    return (
        <>
       

        <Carousel data-bs-theme="dark" style={{ height: "100vh" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://domf5oio6qrcr.cloudfront.net/medialibrary/7377/hb-weighless-0916207265516221.jpg"
          alt="First slide"
          style={{ height: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h5>COUNT YOUR CALORIES</h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://nextlevelfitapp.com/cdn/shop/articles/How_to_Count_Calories_for_Better_Health_and_Fitness.png?v=1736511658&width=1100"
          alt="Second slide"
          style={{ height: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h5></h5>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/0e56b2af-0d1b-4bbe-b803-ebcd47af3e9c.__CR0,0,970,600_PT0_SX970_V1___.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5></h5>
          <p>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
    )
}

export default Display