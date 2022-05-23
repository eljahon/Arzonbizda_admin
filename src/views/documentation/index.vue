
<script>
// import DropdownMenu from '@/components/Share/DropdownMenu'
import Pagination from '@/components/Pagination'
import { shopsList, newProductsAddRequest } from '@/api/shops'
import dayjs from 'dayjs'
export default {
  name: 'Documentation',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      shopName: 'будут добавлены новые товары из магазина',
      list: [],
      total: 2,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      baseUrl: {
        Asaxiy: '/admin/asaxiy-fill'
      }
    }
  },
  mounted: function() {
    this.listLoading = true
    shopsList().then(res => {
      console.log(res)
      // this.$notify({
      //   title: 'Success',
      //   message: 'Delete Successfully',
      //   type: 'success',
      //   duration: 2000
      // })
      this.list = res.data.shops.map(el => {
        return {
          ...el,
          baseUrl: '/admin/mediapark-fill'

        }
      })
      //  Media Park
      // Texnomart
      console.log(this.list)
    }).finally(() => {
      this.listLoading = false
    })
  },
  methods: {
    dayjs,
    handleData(item) {
      const url = item.baseUrl
      newProductsAddRequest(url)
        .then(res => {
          console.log(res)
          this.$notify({
            title: 'Успех',
            message: `${this.shopName + ' ' + item.name}`,
            type: 'success',
            duration: 2000
          })
        }).catch(error => {
          console.log(error)
          this.$notify({
            title: `${this.shopName + item.name}`,
            message: `${this.shopName + item.name}`,
            type: 'success',
            duration: 2000
          })
        })
      // console.log(item, index)
    },
    sortChange(il, ins) {
      console.log(il, ins)
    },
    getList() {
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<template>
  <div class="app-container">
    <div class="clearfix" style="margin-bottom: 15px">
      <!--        <span>Card name</span>-->
      <span style="float:right;">
        <el-button round icon="el-icon-plus" size="medium" type="primary">Новый магазин добавить</el-button>
      </span>
    </div>
    <el-card>
      <el-table
        :key="tableKey"
        :data="list"
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column
          label="Магазин"
          prop="name"
          sortable="custom"
          align="left"
          :class-name="getSortClass('name')"
        >
          <!--          <template slot-scope="{row}">-->
          <!--            <span>{{ row.name }}</span>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column sortable="custom" label="Продукты" align="left">
          <template slot-scope="{row}">
            <span>{{ dayjs(row.createdAt).format('DD.MM.YYYY') }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable="custom" label="Дата обноление" align="left">
          <template slot-scope="{row}">
            <span>{{ dayjs(row.updatedAt).format('DD.MM.YYYY') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Действие" align="left" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button icon="el-icon-refresh" size="mini" type="danger" @click="handleData(row)">
              Обновить
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination
          v-show="total>0"
          style="float: right"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
    </el-card>
  </div>

</template>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
