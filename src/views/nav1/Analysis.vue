<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="param">
                <el-form-item>
                    <el-input placeholder="病历编号" style="width: 100px;" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="姓名" style="width: 100px;" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select placeholder="性别" v-model="gender" style="width: 100px;" clearable size="small">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="Analysis" size="small">预测分析</el-button>
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
        <el-dialog title="预测分析" v-model="dialogVisible" :close-on-click-modal="true" :show-close="true" top="9vh" size="large">
            <section class="chart-container">
                <el-row>
                    <el-col :span="12">
                        <div id="radar" style="width:100%; height:400px;"></div>
                    </el-col>
                    <el-col :span="12">
                        <div id="pie" style="width:100%; height:400px;"></div>
                    </el-col>
                </el-row>
            </section>
            <div>
                <div>
                    <span style="font-size: 16px;"><a style="font-weight:bold;">诊断：</a>患有糖尿病的可能性为<a style="font-weight:bold;">非常大</a></span>
                </div>
                <div>
                    <span style="font-size: 16px;"><a style="font-weight:bold;">分析：</a>身体质量指数偏高，腰臀比过大，体脂过多，易导致胰岛素敏感性下降，运动量极低，和平均水平相差较大，无既往相关病史，可通过各方面调节降低糖尿病发病率。</span>
                </div>
                <div>
                    <span style="font-size: 16px;"><a style="font-weight:bold;">建议：</a>膳食纤维和维生素要充分，严格控制好两餐时间，饮食规律，切忌暴饮暴食；增大运动量，餐后多散步，吸烟饮酒频率应适当降低。</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" style="padding:0px 10px;">
                <el-button @click.native="dialogCancel" size="small">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import './Analysis.less'
    import echarts from 'echarts'

    export default {
        data() {
            return {
                param: {
                    a: '',
                    y: '',
                    cycle: ''
                },
                gender: '',
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
                radarChart: '',
                pieChart: '',
                total: 0,
                page: 1,
                pageSize: 10
            }
        },
        methods: {
            EChart() {
                this.radarChart = echarts.init(document.getElementById('radar'));
                this.pieChart = echarts.init(document.getElementById('pie'));
                var radarOption = {
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['实际指标　　　　', '平均指标'],
                        textStyle: {
                            // fontSize: 15
                        }
                    },
                    radar: {
                        name: {
                            textStyle: {
                                color: '#fff',
                                // fontSize: 15,
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            {name: '年龄', max: 120},
                            {name: '高血压/高血脂病史', max: 1},
                            {name: '身体质量指数(BMI)', max: 50},
                            {name: '腰臀比(WHR)', max: 2},
                            {name: '吸烟频率', max: 1},
                            {name: '饮酒频率', max: 1},
                            {name: '饮食量', max: 1},
                            {name: '运动量', max: 1},
                        ]
                    },
                    series: [{
                        type: 'radar',
                        data: [
                            {
                                value: [25, 0, 36, 1.1, 0.6, 0.8, 1, 0.2],
                                name: '实际指标　　　　',
                                areaStyle: {
                                    normal: {
                                        color: 'rgba(255, 0, 0, .8)'
                                    }
                                }
                            },
                            {
                                value: [33.2409, 0.3490, 31.9926, 0.8100, 0.2770, 0.2297, 0.8000, 0.6000],
                                name: '平均指标',
                                areaStyle: {
                                    normal: {
                                        color: 'rgba( 255, 165, 0, .8)'
                                    }
                                }
                            }
                        ]
                    }],
                    color: ['rgb(255, 0, 0)', 'rgb(255, 165, 0)']
                };
                var pieOption = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['年龄', '高血压/高血脂病史', '身体质量指数(BMI)', '腰臀比(WHR)', '吸烟频率', '饮酒频率', '饮食量', '运动量'],
                        textStyle: {
                            // fontSize: 15
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '70%',
                            center: ['58%', '50%'],
                            minAngle: '18',
                            label: {
                                // fontSize: 15
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data: [
                                {value: 24, name: '年龄'},
                                {value: 0, name: '高血压/\n高血脂病史'},
                                {value: 22.3, name: '身体质量指数(BMI)'},
                                {value: 0.82, name: '腰臀比(WHR)'},
                                {value: 0.1, name: '吸烟频率'},
                                {value: 0.2, name: '饮酒频率'},
                                {value: 0.2, name: '饮食量'},
                                {value: 0.5, name: '运动量'}
                            ]
                        }
                    ]
                };

                this.radarChart.setOption(radarOption);
                this.pieChart.setOption(pieOption);
            },
            Analysis() {
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