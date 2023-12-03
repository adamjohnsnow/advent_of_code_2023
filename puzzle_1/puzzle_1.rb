def replace_digits(line)
  line.gsub!('one', 'o1e')
  line.gsub!('two', 't2o')
  line.gsub!('three', 't3e')
  line.gsub!('four', '4')
  line.gsub!('five', '5e')
  line.gsub!('six', '6')
  line.gsub!('seven', '7')
  line.gsub!('eight', 'e8t')
  line.gsub!('nine', 'n9e')

  return line
end

totalSum = 0

File.foreach('./puzzle_input_1.txt') do |line|
  sub_line = replace_digits(line)
  totalSum = totalSum + (sub_line[/\d/] + sub_line.reverse[/\d/]).to_i
end

p totalSum