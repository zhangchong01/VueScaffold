<template>
    <el-col :span="14" :offset="4">
        <el-form :model="form" label-width="50px" :rules="formRules" ref="form"
                 style="margin-top: 50px;">
            <el-form-item label="公司" prop="companyName">
                <el-input v-model="form.companyName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地点">
                <el-radio-group v-model="form.companyAddress" size="medium">
                    <el-radio-button label="杭州"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="广州"></el-radio-button>
                    <el-radio-button label="深圳"></el-radio-button>
                    <el-radio-button label="武汉"></el-radio-button>
                    <el-radio-button label="其他"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker v-model="form.submitTime" type="date" placeholder="选择日期"
                                :clearable="false" :editable="false" @change="subTimeChange"
                                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio-group v-model="form.submitType">
                    <el-radio-button label="网申"></el-radio-button>
                    <el-radio-button label="内推"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="进度">
                <el-radio-group v-model="form.progress" size="medium">
                    <el-radio-button label="初筛"></el-radio-button>
                    <el-radio-button label="待笔试"></el-radio-button>
                    <el-radio-button label="待初面"></el-radio-button>
                    <el-radio-button label="待复面"></el-radio-button>
                    <el-radio-button label="待三面"></el-radio-button>
                    <!--<el-radio-button label="待四面"></el-radio-button>-->
                    <el-radio-button label="待HR面"></el-radio-button>
                    <el-radio-button label="待通知"></el-radio-button>
                    <el-radio-button label="被拒"></el-radio-button>
                    <el-radio-button label="OFFER"></el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.comment" :rows="5"></el-input>
            </el-form-item>
            <el-form-item align="right">
                <el-button @click.native.prevent style="margin-right: 20px;">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    // import {resetPass} from '../../api/api';
    import util from '../../common/js/util'

    export default {
        data() {
            return {
                formRules: {
                    companyName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'}
                    ]
                },
                form: {
                    id: 0,
                    companyName: '',
                    companyAddress: '杭州',
                    submitTime: new Date(),
                    submitType: '网申',
                    progress: '初筛',
                    comment: ''
                }
            }
        },
        methods: {

        }
    }

</script>