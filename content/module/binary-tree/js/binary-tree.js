moduleOn = () => {
    let moduleRoot = rootDiv.find(">div");
    l("module on called");

    let queue = [];

    function navigateTreeBreadthFirst() {
        if (queue.length === 0) {/*l('queue is empty');*/
            return;
        }
        let node = queue[0].node;
        let leftSpace = '';
        for (let i = 0; i < queue[0].level; i++) leftSpace += '   ';
        l(leftSpace + "val:", node.val, "lvl:", queue[0].level);
        printf(' ' + node.val + '(L' + queue[0].level + ')', breadthFirstNavResult);
        if (node.left) queue.push({node: node.left, level: queue[0].level + 1});
        if (node.right) queue.push({node: node.right, level: queue[0].level + 1});
        queue.splice(0, 1);
        navigateTreeBreadthFirst();
    }

    let sums = [];
    let counts = [];

    function getEachLevelStats(node, level) {
        //if(!sums)sums=[];
        if (!level) level = 0;
        if (!sums[level]) sums.push(0);
        sums[level] += node.val;
        if (!counts[level]) counts.push(1); else counts[level]++;
        if (node.left) getEachLevelStats(node.left, level + 1);
        if (node.right) getEachLevelStats(node.right, level + 1);
    }

    class TreeNode { // class for each binary tree node
        left = null;
        right = null;

        constructor(val) {
            this.val = parseInt(val) || null;
        }

        navigateTreeDepthFirst(level) {
            if (!level) level = 0;
            let leftSpace = '';
            for (let i = 0; i < level; i++) leftSpace += '   ';
            l(leftSpace + "val:", this.val, "lvl:", level);
            printf(' ' + this.val + '(L' + level + ')', depthFirstNavResult);
            if (this.left) this.left.navigateTreeDepthFirst(level + 1);
            if (this.right) this.right.navigateTreeDepthFirst(level + 1);
        }

        drawTree(targetDiv, level, direction) {
            if (!targetDiv) {
                console.error('Target Div parameter needed');
                return;
            }
            if (!level) level = 0;
            if (!direction) direction = 'root';
            let nodeElm = $("<div>").addClass('b-tree-node').addClass(direction).html('<div class="b-tree-node-val">' + this.val + '</div>').appendTo(targetDiv);
            if (direction === 'left') {
                let lineFromLeft = $("<div>").addClass('line-from-left-node').prependTo(nodeElm);
                var angle = Math.atan2((44), (lineFromLeft.width())) * (180 / Math.PI);
                lineFromLeft.css('transform', 'rotateZ(-' + angle + 'deg)');
            }
            if (direction === 'right') {
                let lineFromRight = $("<div>").addClass('line-from-right-node').prependTo(nodeElm);
                var angle = Math.atan2((44), (lineFromRight.width())) * (180 / Math.PI);
                lineFromRight.css('transform', 'rotateZ(' + angle + 'deg)');
            }
            if (this.left) this.left.drawTree(nodeElm, level + 1, 'left'); else if (this.right) $("<div>").css({
                float: 'left',
                width: '50%'
            }).appendTo(nodeElm);
            if (this.right) this.right.drawTree(nodeElm, level + 1, 'right');
        }
    }

    // create the tree
    let bTreeRoot = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left.left = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left.left.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left.left.right.left = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left.left.right.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.left.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right.left = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right.right.left = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right.right.left.right = new TreeNode(h.getRandomInteger(1,100));
    bTreeRoot.right.right.left.right.left = new TreeNode(h.getRandomInteger(1,100));

    l("tree created:", bTreeRoot);
    printf('<pre>tree created: <code>' + JSON.stringify(bTreeRoot, null, 0) + '</code></pre>', moduleRoot);
    let bTreeRootDiv = printf('tree drawn:', moduleRoot).addClass('btree-draw-root');
    bTreeRoot.drawTree(bTreeRootDiv);

    // navigate (depth first)
    l("NAVIGATE (depth first) (w/recursion):");
    let depthFirstNavResult = printf('NAVIGATE (depth first) (w/recursion):', moduleRoot);
    bTreeRoot.navigateTreeDepthFirst();

    // navigate (breadth first)
    l("NAVIGATE (breadth first) (w/queue):");
    let breadthFirstNavResult = printf('NAVIGATE (breadth first) (w/queue):', moduleRoot);
    queue.push({node: bTreeRoot, level: 0});
    navigateTreeBreadthFirst();

    // get each level's sum
    getEachLevelStats(bTreeRoot);
    l("sums:", sums, "counts:", counts);
    printf("(EACH LEVEL'S) sums: " + JSON.stringify(sums) + " | counts: " + JSON.stringify(counts), moduleRoot);
    if (sums.length > 0 && sums.length === counts.length) {
        let avgs = [];
        for (let i = 0; i < sums.length; i++) avgs.push(sums[i] / counts[i]);
        l("avgs:", avgs);
        printf("(EACH LEVEL'S) averages: " + JSON.stringify(avgs, null, 1), moduleRoot);
    }
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");