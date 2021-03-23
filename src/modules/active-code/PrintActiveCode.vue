<template>
  <div>
    <center>
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="bodyTable"
      >
        <tr>
          <td align="center" valign="top" id="bodyCell">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              class="templateContainer"
            >
              <tr>
                <td valign="top" id="templatePreheader"></td>
              </tr>
              <tr>
                <td valign="top" id="templateHeader">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    class="mcnTextBlock"
                    style="min-width:100%;"
                  >
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td
                          valign="top"
                          class="mcnTextBlockInner"
                          style="padding-top:9px;"
                        >
                          <table
                            align="left"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="max-width:100%; min-width:100%;"
                            width="100%"
                            class="mcnTextContentContainer"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="mcnTextContent"
                                  style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;"
                                >
                                  <div style="text-align: center;">
                                    <img
                                      data-file-id="5172182"
                                      src="https://mcusercontent.com/38f8a40e7fcf0da44ad2f2a33/images/3b6617f5-ac4f-4e06-9482-186976d21943.png"
                                      style="border: 0px  ; width: 68px; height: 56px; margin: 0px; margin-right: 12px"
                                    />&nbsp;&nbsp;<span style="color:#000000"
                                      ><span style="font-size:23px"
                                        ><span
                                          style="font-family:roboto,helvetica neue,helvetica,arial,sans-serif"
                                          >Trường THCS &amp; THPT Lương Thế
                                          Vinh</span
                                        ></span
                                      ></span
                                    >
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" id="templateBody">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    class="mcnTextBlock"
                    style="min-width:100%;"
                  >
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td
                          valign="top"
                          class="mcnTextBlockInner"
                          style="padding-top:9px;"
                        >
                          <table
                            align="left"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="max-width:100%; min-width:100%;"
                            width="100%"
                            class="mcnTextContentContainer"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="mcnTextContent"
                                  style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;"
                                >
                                  <div style="text-align: center;">
                                    <br />
                                    <br />
                                    <span
                                      style="font-size:18px; font-weight: bold"
                                      >Mã kích hoạt</span
                                    ><br />
                                    <br />
                                    <span style="font-size:32px">{{
                                      code
                                    }}</span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    class="mcnTextBlock"
                    style="min-width:100%;"
                  >
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td
                          valign="top"
                          class="mcnTextBlockInner"
                          style="padding-top:9px;"
                        >
                          <table
                            align="left"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            style="max-width:100%; min-width:100%;"
                            width="100%"
                            class="mcnTextContentContainer"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="mcnTextContent"
                                  style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;"
                                >
                                  <div style="text-align: right;">
                                    <br />
                                    <br />
                                    Ngày xuất mã kích hoạt<br />
                                    <br />
                                    {{ getCreatedAt }}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="top" id="templateFooter"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    code: String,
    createdAt: String,
  },
  computed: {
    getCreatedAt() {
      return moment(this.createdAt).format("DD/MM/YYYY");
    },
  },
};
</script>
<style>
@import "./PrintActiveCode.css";
</style>
