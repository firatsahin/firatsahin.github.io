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
        $("div.breadth-first-nav-result").append(' ' + node.val + '(L' + queue[0].level + ')');
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
            $("div.depth-first-nav-result").append(' ' + this.val + '(L' + level + ')');
            if (this.left) this.left.navigateTreeDepthFirst(level + 1);
            if (this.right) this.right.navigateTreeDepthFirst(level + 1);
        }
    }

    // create the tree
    let bTreeRoot = new TreeNode(23);
    bTreeRoot.left = new TreeNode(8);
    bTreeRoot.right = new TreeNode(19);
    bTreeRoot.left.left = new TreeNode(45);
    bTreeRoot.left.left.right = new TreeNode(12);
    bTreeRoot.left.right = new TreeNode(29);
    bTreeRoot.right.right = new TreeNode(63);
    bTreeRoot.right.left = new TreeNode(97);
    bTreeRoot.right.right.left = new TreeNode(129);

    l("tree created:", bTreeRoot);
    $("<div>").html('<pre>tree created: <code>' + JSON.stringify(bTreeRoot,null,4) + '</code></pre>').appendTo(moduleRoot);

    // navigate (depth first)
    l("NAVIGATE (depth first) (w/recursion):");
    $("<div>").addClass('depth-first-nav-result').html('NAVIGATE (depth first) (w/recursion):').appendTo(moduleRoot);
    bTreeRoot.navigateTreeDepthFirst();

    // navigate (breadth first)
    l("NAVIGATE (breadth first) (w/queue):");
    $("<div>").addClass('breadth-first-nav-result').html('NAVIGATE (breadth first) (w/queue):').appendTo(moduleRoot);
    queue.push({node: bTreeRoot, level: 0});
    navigateTreeBreadthFirst();

    // get each level's sum
    getEachLevelStats(bTreeRoot);
    l("sums:", sums, "counts:", counts);
    $("<div>").html("(EACH LEVEL'S) sums: " + JSON.stringify(sums) + " | counts: " + JSON.stringify(counts)).appendTo(moduleRoot);
    if (sums.length > 0 && sums.length === counts.length) {
        let avgs = [];
        for (let i = 0; i < sums.length; i++) avgs.push(sums[i] / counts[i]);
        l("avgs:", avgs);
        $("<div>").html("(EACH LEVEL'S) averages: " + JSON.stringify(avgs,null,1)).appendTo(moduleRoot);
    }
}

moduleOff = () => {
    l("module off called");
}

l("module on-off events loaded");