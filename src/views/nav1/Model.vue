<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="param">
                <el-form-item>
                    <el-upload class="upload-demo" action="" drag multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">拖拽或<em>点击导入</em>样本文件</div>
                    </el-upload>
                </el-form-item>
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
                <el-form-item>
                    <el-button type="primary" @click="createModel" size="small">构建模型</el-button>
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
        <el-dialog title="诊断模型构建" v-model="dialogVisible" :close-on-click-modal="true" :show-close="true" top="13vh">
            <!--列表-->
            <el-table id="model" :data="models" highlight-current-row v-loading="listLoading"
                      @selection-change="selsChange" @sort-change="sortChange">
                <el-table-column prop="value" label="阈值" min-width="60"></el-table-column>
                <el-table-column prop="rate" label="识别率" min-width="60"></el-table-column>
                <el-table-column label="操作" min-width="60">
                    <template scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer" style="padding:0px 10px;">
                <el-button type="primary" @click.native="dialogCancel" size="small">重新构建</el-button>
                <el-button type="success" @click.native="dialogCancel" size="small">保存</el-button>
                <el-button @click.native="dialogCancel" size="small">关闭</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import "./Model.less";
    export default {
        data() {
            return {
                param: {
                    a: '',
                    y: '',
                    cycle: ''
                },
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
                models: [{
                    "value": "0.6",
                    "rate": "94.52%"
                }, {
                    "value": "0.65",
                    "rate": "95.46%"
                }, {
                    "value": "0.7",
                    "rate": "95.88%"
                }, {
                    "value": "0.75",
                    "rate": "97.40%"
                }, {
                    "value": "0.8",
                    "rate": "97.52%"
                }, {
                    "value": "0.85",
                    "rate": "92.13%"
                }, {
                    "value": "0.9",
                    "rate": "88.91%"
                }],
                dialogVisible: false,//对话框是否显示
                total: 0,
                page: 1,
                pageSize: 10
            }
        },
        methods: {
            createModel() {
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
        }
    }

</script>