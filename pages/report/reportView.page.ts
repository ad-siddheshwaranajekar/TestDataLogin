import { Page, Locator, expect } from "@playwright/test";
import { CommonUtils } from "../../utils/commonUtils";

import { BasePage } from "../basePage";
export class ReportViewPage extends BasePage {
  readonly page: Page;
  readonly utils: CommonUtils;  

    readonly reportTitle: Locator;
    