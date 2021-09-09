import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { dataCategory } from '../models/dataCat';
import { IaddAttribut } from '../models/IaddAttribute';
import { ICategory } from '../models/ICategory';
import { ISubCategory } from '../models/ISubCategory';
import { IupdateAttribut } from '../models/IupadteAttribut';
import { IAddProdact } from '../models/prodactAdd';
import { IupdateProdact } from '../models/prodactUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProdactsService {
  constructor(private http: HttpClient) { }
  allProdactes(page: any, limit: any) {
    return this.http.get(`${environment.urlDev}prodact/getAll?page=${page}&&limit=${limit}`)
  }
  addProdact(data: IAddProdact) {
    return this.http.post(`${environment.urlDev}prodact/add`, data)

  }
  updateProadact(data: IupdateProdact, id: any) {
    return this.http.put(`${environment.urlDev}prodact/updateProdact/${id}`, data)

  }
  addCategoryToProdact(id: any, data: any) {
    return this.http.put(`${environment.urlDev}prodact/addCateg/${id}`, data)
  }
  deleteCategoryToProdact(id: any, idCategory: any) {
    return this.http.delete(`${environment.urlDev}prodact/deleteCateg/${id}?id=${idCategory}`)
  }
  delateAttribute(id: any, IdAttribut: any) {
    return this.http.delete(`${environment.urlDev}prodact/delete/attribute/${id}?id=${IdAttribut}`)

  }
  updateAttribute(id: any, IdAttribut: any, data: IaddAttribut) {
    return this.http.put(`${environment.urlDev}prodact/upate/attribute/${id}?id=${IdAttribut}`, data)

  }
  addAttribute(id: any, data: IupdateAttribut) {
    return this.http.put(`${environment.urlDev}prodact/add/attribute/${id}`, data)

  }
  getAttribute(id: any, IdAttribut: any,) {
    return this.http.get(`${environment.urlDev}prodact/get/attribute/${id}?id=${IdAttribut}`)

  }
  detailsProdact(id: any) {
    return this.http.get(`${environment.urlDev}prodact/getDetails/${id}`)

  }
  deleteProdact(id: any) {
    return this.http.delete(`${environment.urlDev}prodact/deleteProdact/${id}`)

  }
  getAllHistory(limit: any, page: any) {
    return this.http.get(`${environment.urlDev}history/getAll?limit=${limit}&&page=${page}`)

  }
  detailsHistory(id: any) {
    return this.http.get(`${environment.urlDev}history/${id}`)
  }
  deleteHistory(id: any) {
    return this.http.delete(`${environment.urlDev}history/delete/${id}`)
  }
  filterHistoryByStatus(filter: any, limit: any, page: any) {
    return this.http.get(`${environment.urlDev}history/getByStatus?status=${filter}&&limit=${limit}&&page=${page}`)

  }
  getInventaries() {
    return this.http.get(`${environment.urlDev}inventaries/getAll`)

  }
  filterInventariesByStatus(filter: any) {
    return this.http.get(`${environment.urlDev}inventaries/getByStatus?status=${filter}`)

  }
  getAllOrders() {
    return this.http.get(`${environment.urlDev}orders`)

  }
  getAllSubCatg() {
    return this.http.get(`${environment.urlDev}subcategories/get`)

  }
  getAllCategory() {
    return this.http.get(`${environment.urlDev}categories/get`)

  }
  addCategory(data: ICategory) {
    return this.http.post(`${environment.urlDev}categories/add`, data)

  }
  updateCategory(data: dataCategory, id: any) {
    return this.http.put(`${environment.urlDev}categories/update/${id}`, data)

  }
  getDetailsCategory(id: any) {
    return this.http.get(`${environment.urlDev}categories/get/${id}`)

  }
  getSubCategory(id: any) {
    return this.http.get(`${environment.urlDev}subcategories/get/${id}`)

  }
  addSubCategory(data: ISubCategory) {
    return this.http.post(`${environment.urlDev}subcategories/add`, data)

  }
  updateSubCategory(data: dataCategory, id: any) {
    return this.http.put(`${environment.urlDev}subcategories/update/${id}`, data)

  }
  addimg(data: any, id: any) {
    return this.http.post(`${environment.urlDev}prodact/add/img/${id}`, data)

  }
  updateimg(data: any, id: any, idImge: any) {
    return this.http.put(`${environment.urlDev}prodact/img/${id}/${idImge}`, data)

  }
  deleteimg(id: any, idImge: any) {
    return this.http.delete(`${environment.urlDev}prodact/delete/img/${id}/${idImge}`)

  }
  deleteCategory(id:any){
    return this.http.delete(`${environment.urlDev}categories/delete/${id}`)

  }
  deleteSubCategory(id:any){
    return this.http.delete(`${environment.urlDev}subcategories/delete/${id}`)

  }
  myInfromtion(){
    return this.http.get(`${environment.urlDev}me`,)

  }
}
