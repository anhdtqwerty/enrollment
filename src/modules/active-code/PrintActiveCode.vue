<template>
  <body>
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
                                  style="padding: 0px 18px 9px; line-height: 100%;"
                                >
                                  <div style="text-align: left;">
                                    <span style="font-size:18px"
                                      ><img
                                        data-file-id="5172182"
                                        height="52"
                                        src="https://mcusercontent.com/38f8a40e7fcf0da44ad2f2a33/images/3b6617f5-ac4f-4e06-9482-186976d21943.png"
                                        style="border: 0px  ; width: 64px; height: 52px; margin: 0px;"
                                        width="64"/></span
                                    >&nbsp;&nbsp;<span style="font-size:20px"
                                      ><strong
                                        ><span style="color:#05367D"
                                          ><span
                                            style="font-family:roboto,helvetica neue,helvetica,arial,sans-serif"
                                            >Trường THCS &amp; THPT Lương Thế
                                            Vinh</span
                                          ></span
                                        ></strong
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
                                    <br />
                                    <span style="color:#757575"
                                      ><strong
                                        ><span style="font-size:18px"
                                          >MÃ KÍCH HOẠT</span
                                        ></strong
                                      ></span
                                    ><br />
                                    <br />
                                    <strong
                                      ><span style="font-size:32px">{{
                                        activeCode.code || "---"
                                      }}</span></strong
                                    ><br />
                                    <br />
                                    <span style="color:#757575"
                                      ><strong
                                        ><span style="font-size:18px">{{
                                          activeCode.grade || "---"
                                        }}</span></strong
                                      ></span
                                    ><br />
                                    <br />
                                    <br />
                                    <br />
                                    &nbsp;
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
                            width="50%"
                            class="mcnTextContentContainer"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="mcnTextContent"
                                  style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;"
                                >
                                  <div style="text-align: left;">
                                    Người xuất mã kích hoạt<br />
                                    <br />
                                    <strong>{{
                                      activeCode.createdBy || "Admin"
                                    }}</strong>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            align="left"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="50%"
                            class="mcnTextContentContainer"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  class="mcnTextContent"
                                  style="padding-top:0; padding-left:18px; padding-bottom:9px; padding-right:18px;"
                                >
                                  <div style="text-align: right;">
                                    Ngày xuất mã kích hoạt<br />
                                    <br />
                                    <strong>{{ getCreatedAt }}</strong>
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
  </body>
</template>

<script>
import moment from "moment";
export default {
  props: {
    activeCode: Object,
  },
  computed: {
    getCreatedAt() {
      if (this.activeCode.createdAt)
        return moment(this.activeCode.createdAt).format("DD/MM/YYYY");
      return "---";
    },
  },
};
</script>
<style>
@import "./PrintActiveCode.css";
</style>
