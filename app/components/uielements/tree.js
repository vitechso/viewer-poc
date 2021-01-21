import { Tree } from 'antd';
import AntTree from '@ql/styles/tree.style';
import WithDirection from '@ql/lib/helpers/rtl';
const WDTrees = AntTree(Tree);
const Trees = WithDirection(WDTrees);

const TreeNode = Tree.TreeNode;

export default Trees;
export { TreeNode };
