import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: this.props.book.averageRating
        };
    }


    render() {


        const { rating } = this.state;
        return (
            <div>
              <h5>Average: {rating}</h5>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    editing={false}

                />
            </div>
        );
    }
}

export default Rating
