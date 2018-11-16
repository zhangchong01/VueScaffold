<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="param">
                <el-form-item label="设置参数:">
                    <el-input placeholder="参数值" v-model="param.a" style="width: 120px;" size="small">
                        <template slot="prepend">α=</template>
                    </el-input>
                    <el-input placeholder="参数值" v-model="param.y" style="width: 120px;margin-left: 10px;" size="small">
                        <template slot="prepend">γ=</template>
                    </el-input>
                    <el-input placeholder="参数值" v-model="param.cycle" style="width: 140px;margin-left: 10px;"
                              size="small">
                        <template slot="prepend">cycle=</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="样本规模:">
                    <el-radio-group v-model="dataPercent" size="small">
                        <el-radio-button label="100%"></el-radio-button>
                        <el-radio-button label="60%"></el-radio-button>
                        <el-radio-button label="30%"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="FeaturesChoose" size="small">特征选择</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table id="feature" :data="features" highlight-current-row v-loading="listLoading">
            <el-table-column type="selection" min-width="15"></el-table-column>
            <el-table-column prop="id" label="ID" min-width="30"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="30"></el-table-column>
            <el-table-column prop="gender" label="性别" min-width="30"></el-table-column>
            <el-table-column prop="age" label="年龄" min-width="30"></el-table-column>
            <el-table-column prop="tc" label="TC" min-width="30"></el-table-column>
            <el-table-column prop="tg" label="TG" min-width="30"></el-table-column>
            <el-table-column prop="hdlc" label="HDL-C" min-width="30"></el-table-column>
            <el-table-column prop="ldlc" label="LDL-C" min-width="30"></el-table-column>
            <el-table-column prop="sbp" label="SBP" min-width="30"></el-table-column>
            <el-table-column prop="dbp" label="DBP" min-width="30"></el-table-column>
            <el-table-column prop="fpg" label="FPG" min-width="30"></el-table-column>
            <el-table-column prop="fcp" label="FCP" min-width="30"></el-table-column>
            <el-table-column prop="fins" label="FINS" min-width="30"></el-table-column>
            <el-table-column prop="hbalc" label="HbA1c" min-width="30"></el-table-column>
            <el-table-column prop="2hfpg" label="2hFPG" min-width="30"></el-table-column>
            <el-table-column prop="2hfcp" label="2hFCP" min-width="30"></el-table-column>
            <el-table-column prop="2hfins" label="2hFINS" min-width="30"></el-table-column>
            <el-table-column prop="crp" label="CRP" min-width="30"></el-table-column>
            <el-table-column prop="ua" label="UA" min-width="30"></el-table-column>
            <el-table-column prop="bmi" label="BMI" min-width="30"></el-table-column>
            <el-table-column prop="whr" label="WHR" min-width="30"></el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--对话框-->
        <el-dialog custom-class="features" title="特征选择" v-model="dialogVisible" :close-on-click-modal="true" :show-close="true" top="18vh">
            <section class="chart-container">
                <el-row>
                    <el-col :span="24">
                        <div id="featureChart" style="width:100%; height:400px;"></div>
                    </el-col>
                </el-row>
            </section>
            <div slot="footer" class="dialog-footer" style="padding:0px 10px;">
                <el-button type="primary" @click.native="dialogCancel" size="small">重新选择</el-button>
                <el-button type="success" @click.native="dialogCancel" size="small">保存特征集</el-button>
                <el-button @click.native="dialogCancel" size="small">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import './Features.less'
    import data from '../../api/data.json'
    import echarts from 'echarts'

    export default {
        data() {
            return {
                param: {
                    a: 0.2,
                    y: 1,
                    cycle: 200
                },
                dataPercent: '100%',
                features: data,
                dialogVisible: false,//对话框是否显示
                echart: '',
                total: 3998,
                page: 1,
                pageSize: 10
            }
        },
        methods: {
            EChart() {
                this.echart = echarts.init(document.getElementById('featureChart'));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['其他', '血脂', '血压', '葡萄糖耐量', '年龄', 'BMI', 'TC', 'LDL-C', 'SBP', 'DBP', 'FPG', 'FCP', 'FINS', '2hFPG', '2hFINS', 'HbA1c']
                    },
                    series: [
                        {
                            name: '最优子特征',
                            type: 'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],
                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 335, name: '其他', selected: true},
                                {value: 666, name: '血脂'},
                                {value: 666, name: '血压'},
                                {value: 2148, name: '葡萄糖耐量'}
                            ]
                        },
                        {
                            name: '最优子特征',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        hr: {
                                            borderColor: '#aaa',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        b: {
                                            fontSize: 16,
                                            lineHeight: 33
                                        },
                                        per: {
                                            color: '#eee',
                                            backgroundColor: '#334455',
                                            padding: [2, 4],
                                            borderRadius: 2
                                        }
                                    }
                                }
                            },
                            data: [
                                {value: 147, name: '年龄'},
                                {value: 188, name: 'BMI'},
                                {value: 333, name: 'TC'},
                                {value: 333, name: 'LDL-C'},
                                {value: 333, name: 'SBP'},
                                {value: 333, name: 'DBP'},
                                {value: 358, name: 'FPG'},
                                {value: 358, name: 'FCP'},
                                {value: 358, name: 'FINS'},
                                {value: 358, name: '2hFPG'},
                                {value: 358, name: '2hFINS'},
                                {value: 358, name: 'HbA1c'}
                            ]
                        }
                    ]
                };
                this.echart.setOption(option);
            },
            FeaturesChoose() {
                this.dialogVisible = true;
                this.EChart();
            },
            handleCurrentChange(val) {
                this.page = val;
                // this.getJobs();
            },//取消
            dialogCancel: function () {
                this.dialogVisible = false;
            },
        },
        mounted() {
            this.EChart();
        },
        updated() {
            this.EChart();
        }
    }

</script>