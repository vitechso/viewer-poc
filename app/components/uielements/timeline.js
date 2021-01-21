import { Timeline } from 'antd';
import AntTimeline from '@ql/styles/timeline.style';
import WithDirection from '@ql/lib/helpers/rtl';
const Timelines = AntTimeline(Timeline);
const WDTimelineItem = AntTimeline(Timeline.Item);
const TimelineItem = WithDirection(WDTimelineItem);

export default WithDirection(Timelines);
export { TimelineItem };
