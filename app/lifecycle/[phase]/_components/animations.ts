import type { ComponentType } from "react";
import type { PhaseId } from "@/app/_lib/phases";
import { AddressAnim } from "./AddressAnim";
import { ConnectionAnim } from "./ConnectionAnim";
import { HttpAnim } from "./HttpAnim";
import { HtmlParsingAnim } from "./HtmlParsingAnim";
import { CssParsingAnim } from "./CssParsingAnim";
import { JavaScriptAnim } from "./JavaScriptAnim";
import { DomAnim } from "./DomAnim";
import { RenderTreeAnim } from "./RenderTreeAnim";
import { LayoutAnim } from "./LayoutAnim";
import { PaintAnim } from "./PaintAnim";
import { CompositeAnim } from "./CompositeAnim";
import { HydrationAnim } from "./HydrationAnim";

export const ANIMATIONS: Record<PhaseId, ComponentType> = {
  address: AddressAnim,
  connection: ConnectionAnim,
  http: HttpAnim,
  "html-parsing": HtmlParsingAnim,
  "css-parsing": CssParsingAnim,
  javascript: JavaScriptAnim,
  dom: DomAnim,
  "render-tree": RenderTreeAnim,
  layout: LayoutAnim,
  paint: PaintAnim,
  composite: CompositeAnim,
  hydration: HydrationAnim,
};
