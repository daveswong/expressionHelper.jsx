// AE 表达式帮助器，将帮助器应用于空文本图层，以显示想要查询的信息
// 调整文本字号以便舒适的显示结果
helper = {
    // 列出当前属性的父级路径，用来帮助我们使用 propertyGroup() 方法，这样就可以清晰的看到该方法应该设置的参数
    // property 属性，图层中的任意属性，因为是在空文本图层中显示，因此你需要使用 pick whip 索引目标属性
    // levels 是向上索引的层级，默认是 10，你可以大概预估一下层级，超出范围也不会报错，但是会输出提示，它不会影响范围内的正确结果
    printPropertyParent: (property, levels = 10) => {
        // 声明一个新数组，这主要是为了可以从下往上显示，更符合父子层级的阅读顺序
        let _arr = [];
        // 根据要显示的层级循环查询
        for (let i = 1; i <= levels; i++) {
            // 使用 try catch 语句避免 AE 抛出错误，AE 一旦表达式报错，就无法继续运行，在非调试环境中尽量保持 AE 报错，否则很难查找错误
            try {
                // 尝试读取这个层级的父级，如果可以读取会将层级索引和层级名称记录到数组中
                _arr.push(`[${i}] ${property.propertyGroup(i)}`);
            } catch (error) {
                // 如果不能读取，会记录错误信息
                _arr.push(`[${i}] ${error}`);
            }
        }
        // 数组反向
        _arr.reverse();
        // 将数组连接成字符串，每一个层级进行一次换行
        return _arr.join('\r')
    },
    // 列出所有子集对象
    printChildren: (obj) => {
        let arr = [];
        for (let i = 1; i < 20; i++) {
            try {
                // 输出 属性索引 属性名称 属性数据类型
                arr.push(`[${i}] ${obj(i).name} ${typeof obj(i)} ${obj(i)}`)
            } catch (err) {
                // 溢出不需要报错
                break;
            }
        }
        return arr.join('\r')
    }
}
