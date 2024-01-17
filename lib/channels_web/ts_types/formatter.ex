defmodule ChannelsWeb.TsTypes.Formatter do
  import Inspect.Algebra

  def to_iodata(doc, line_length) do
    doc
    |> fold_doc(fn doc, acc ->
      line(concat(doc, "\n"), acc)
    end)
    |> format(line_length)
  end

  def block(docs) do
    surround(
      "{",
      fold_doc(docs, fn doc, acc ->
        line(concat(doc, line()), acc)
      end),
      "}",
      "\n"
    )
  end

  def object(properties, opts \\ []) do
    properties = keyvalue_many(properties, ",")

    properties =
      if opts[:force_breaks?] do
        force_unfit(properties)
      else
        properties
      end

    surround("{", properties, "}", " ")
  end

  def interface(properties) do
    surround("{", keyvalue_many(properties, ";"), "}", " ")
  end

  def array(items)
  def array([]), do: "[]"
  def array([item]), do: concat(item, "[]")

  def array(items) do
    flex_glue("Array", "", generic(union(items)))
  end

  def generic(doc) do
    surround("<", doc, ">", "")
  end

  def union(items) do
    join(items, "|")
  end

  def intersection(items) do
    join(items, "&")
  end

  def surround(left, doc, right, break) do
    if doc == empty() do
      concat(left, right)
    else
      group(glue(nest(glue(left, break, doc), 2, :break), break, right))
    end
  end

  def maybe_break(doc) do
    group(nest(doc, 2, :break))
  end

  def comma_separated(items) do
    fold_doc(items, fn doc, acc ->
      glue(concat(doc, ","), acc)
    end)
  end

  def comment(string) do
    lines = string |> String.trim() |> String.split("\n") |> Enum.map(&(" * " <> &1))
    lines = ["/**"] ++ lines ++ [" */"]

    fold_doc(lines, fn doc, acc ->
      line(doc, acc)
    end)
  end

  def keyvalue({key, value}) do
    key =
      case key do
        {key, opts} ->
          description = opts[:description]

          key =
            if description do
              comment = comment(description)
              concat(comment, line(break(), key))
            else
              key
            end

          if Keyword.get(opts, :required?, true) do
            key
          else
            concat(key, "?")
          end

        key ->
          key
      end

    group(concat(concat(key, ": "), value))
  end

  def keyvalue_many(items, separator) do
    items = Enum.map(items, &keyvalue/1)

    fold_doc(items, fn doc, acc ->
      glue(concat(doc, separator), acc)
    end)
  end

  def join(items, separator) do
    group(
      fold_doc(items, fn doc, acc ->
        glue(
          doc,
          concat(separator <> " ", acc)
        )
      end)
    )
  end

  def with_next_break_fits(condition, doc, fun) do
    if condition do
      doc
      |> next_break_fits(:enabled)
      |> fun.()
      |> next_break_fits(:disabled)
    else
      fun.(doc)
    end
  end
end
