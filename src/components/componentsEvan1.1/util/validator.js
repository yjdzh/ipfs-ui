export default {
    integer: (rule, value, callback) => {
        if (value === '') {
            callback();
        } else {
            /^[0-9]*$/.test(value) ? callback() : callback(new Error('格式错误！允许输入整数'));
        }
    }
    
}

