import { Rate } from 'antd';
import Ratings from '@ql/styles/rating.style';
import WithDirection from '@ql/lib/helpers/rtl';
const AntRating = Ratings(Rate);
const Rating = WithDirection(AntRating);
export default Rating;
