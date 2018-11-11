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
            <el-table-column prop="hbalc" label="HbAlc" min-width="30"></el-table-column>
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
        <el-dialog title="特征选择" v-model="dialogVisible" :close-on-click-modal="true" :show-close="true" top="13vh"> <!--18-->
            <section class="chart-container">
                <el-row>
                    <el-col :span="24">
                        <div id="featureChart" style="width:100%; height:450px;"></div>
                    </el-col>
                </el-row>
            </section>
            <div slot="footer" class="dialog-footer" style="padding:0px 10px;">
                <el-button @click.native="dialogCancel" size="small">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import './Features.less'
    import echarts from 'echarts'

    export default {
        data() {
            return {
                param: {
                    a: '',
                    y: '',
                    cycle: ''
                },
                dataPercent: '100%',
                features: [{
                    "id": "Google",
                    "name": "h",
                    "gender": "value",
                    "age": "value",
                    "tc": "value",
                    "tg": "value",
                    "hdlc": "value",
                    "ldlc": "value",
                    "sbp": "value",
                    "dbp": "value",
                    "fpg": "value",
                    "fcp": "value",
                    "fins": "value",
                    "hbalc": "value",
                    "2hfpg": "value",
                    "2hfcp": "value",
                    "2hfins": "value",
                    "crp": "value",
                    "ua": "value",
                    "bmi": "value",
                    "whr": "value"
                }, {
                    "id": "Google",
                    "name": "h",
                    "gender": "value",
                    "age": "value",
                    "tc": "value",
                    "tg": "value",
                    "hdlc": "value",
                    "ldlc": "value",
                    "sbp": "value",
                    "dbp": "value",
                    "fpg": "value",
                    "fcp": "value",
                    "fins": "value",
                    "hbalc": "value",
                    "2hfpg": "value",
                    "2hfcp": "value",
                    "2hfins": "value",
                    "crp": "value",
                    "ua": "value",
                    "bmi": "value",
                    "whr": "value"
                }],
                dialogVisible: false,//对话框是否显示
                echart: '',
                total: 0,
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
                        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                    },
                    series: [
                        {
                            name: '访问来源',
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
                                {value: 335, name: '直达', selected: true},
                                {value: 679, name: '营销广告'},
                                {value: 1548, name: '搜索引擎'}
                            ]
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            label: {
                                normal: {
                                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                    backgroundColor: '#eee',
                                    borderColor: '#aaa',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    // shadowBlur:3,
                                    // shadowOffsetX: 2,
                                    // shadowOffsetY: 2,
                                    // shadowColor: '#999',
                                    // padding: [0, 7],
                                    rich: {
                                        a: {
                                            color: '#999',
                                            lineHeight: 22,
                                            align: 'center'
                                        },
                                        // abg: {
                                        //     backgroundColor: '#333',
                                        //     width: '100%',
                                        //     align: 'right',
                                        //     height: 22,
                                        //     borderRadius: [4, 4, 0, 0]
                                        // },
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
                                {value: 335, name: '直达'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1048, name: '百度'},
                                {value: 251, name: '谷歌'},
                                {value: 147, name: '必应'},
                                {value: 102, name: '其他'}
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