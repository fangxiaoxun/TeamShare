/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function (nums, target) {
    let count = 0;
    let i=0
    let isJump = false
    while (i < nums.length) {
        let j = i + 1;
        while (j < nums.length) {
            // 找到匹配
            if(Math.abs(nums[j] - nums[i] <= target)){
                count++;
                i = j
                isJump = true
                break
            }else{ // 无匹配
                j++;
                continue
            }
        }
        if(!isJump){
            break
        }
        i++;
    }
    if(i == nums.length - 1 && count!=0 ){
        return count
    }else{
        return -1
    }
};