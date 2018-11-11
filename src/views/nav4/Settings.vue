<template>
    <div style="text-align: center;margin-top: 10px;">
        <el-row>
            <el-col :span="6">
                <el-tree class="treeStyle"
                         show-checkbox
                         node-key="id"
                         :data="treeData"
                         :default-expanded-keys="treeExpanded"
                         :default-checked-keys="treeChecked"
                         :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="18">
                <el-transfer style="text-align: left; display: inline-block" filterable
                             v-model="value" @change="handleChange" :data="transferData" size="large"
                             :left-default-checked="leftChecked" :right-default-checked="rightChecked"
                             :format="formater" :titles="titles" :button-texts="btnTxt">
                    <el-button class="transfer-footer" slot="left-footer" size="small">编辑</el-button>
                    <el-button class="transfer-footer" slot="right-footer" size="small">编辑</el-button>
                </el-transfer>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import './Settings.less'

    export default {
        data() {
            return {
                titles: ['源菜单', '目标菜单'],
                btnTxt: ['隐藏菜单', '显示菜单'],
                formater: {
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                },
                treeExpanded: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                treeChecked: [2],
                leftChecked: [],
                rightChecked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                treeData: [{
                    id: 1,
                    label: '系统管理员',
                    children: [{
                        id: 2,
                        label: '分院管理员'
                    }, {
                        id: 3,
                        label: '科室管理员'
                    }]
                }, {
                    id: 4,
                    label: '医护人员',
                    children: [{
                        id: 5,
                        label: '医生'
                    }, {
                        id: 6,
                        label: '护士'
                    }]
                }, {
                    id: 7,
                    label: '患者',
                    children: [{
                        id: 8,
                        label: '糖尿病患者'
                    }, {
                        id: 9,
                        label: '其他患者'
                    }]
                }],
                transferData: [{
                    key: 3,
                    label: '辅助诊断',
                    disabled: false
                }, {
                    key: 1,
                    label: '特征选择',
                    disabled: false
                }, {
                    key: 2,
                    label: '模型构建',
                    disabled: false
                }, {
                    key: 4,
                    label: '预测分析',
                    disabled: false
                }, {
                    key: 6,
                    label: '数据维护',
                    disabled: false
                }, {
                    key: 5,
                    label: '电子病历',
                    disabled: false
                }, {
                    key: 7,
                    label: '报表统计',
                    disabled: false
                }, {
                    key: 9,
                    label: '患者管理',
                    disabled: false
                }, {
                    key: 8,
                    label: '诊疗计划',
                    disabled: false
                }, {
                    key: 10,
                    label: '病情跟踪',
                    disabled: false
                }, {
                    key: 12,
                    label: '系统管理',
                    disabled: false
                }, {
                    key: 11,
                    label: '日志管理',
                    disabled: false
                }, {
                    key: 13,
                    label: '系统设置',
                    disabled: false
                }],
                value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            };
        },
        methods: {
            handleChange(value, direction, movedKeys) {
                console.log(value, direction, movedKeys);
            }
        }
    };
</script>